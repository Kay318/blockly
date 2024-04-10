
#include "stdafx.h"
#include "EdgeBrowserControl.h"
#include "ViewComponent.h"

#include <ShObjIdl_core.h>
#include <Shellapi.h>
#include <ShlObj_core.h>

// 원본 소스
// https://www.codeproject.com/Tips/5287858/WebView2-Edge-Browser-in-MFC-Cplusplus-application
// 참고 
// https://learn.microsoft.com/en-us/microsoft-edge/webview2/reference/win32/icorewebview2environment?view=webview2-1.0.1722.32
// 목적에 맞게 재구성함

static constexpr UINT s_runAsyncWindowMessage = WM_APP;
#define IDM_CREATION_MODE_TARGET_DCOMP 195

CEdgeBrowserControl::CEdgeBrowserControl(CWnd* pParent /*=nullptr*/)
{
    g_hInstance = GetModuleHandle(NULL);
}

CEdgeBrowserControl::~CEdgeBrowserControl()
{
    RemoveEventHandler();
}

void CEdgeBrowserControl::ResizeEverything()
{
    RECT availableBounds = { 0 };
    GetClientRect(&availableBounds);
    // ClientToScreen(&availableBounds);

    if (auto view = GetComponent<ViewComponent>())
    {
        view->SetBounds(availableBounds);
    }
}

void CEdgeBrowserControl::RunAsync(std::function<void()> callback)
{
    auto* task = new std::function<void()>(callback);
    PostMessage(s_runAsyncWindowMessage, reinterpret_cast<WPARAM>(task), 0);
}

void CEdgeBrowserControl::InitializeWebView()
{
    CloseWebView();
    m_dcompDevice = nullptr;

    HRESULT hr2 = DCompositionCreateDevice2(nullptr, IID_PPV_ARGS(&m_dcompDevice));
    if (!SUCCEEDED(hr2))
    {
        AfxMessageBox(_T("Attempting to create WebView using DComp Visual is not supported.\r\n"
            "DComp device creation failed.\r\n"
            "Current OS may not support DComp.\r\n"
            "Create with Windowless DComp Visual Failed"), MB_OK);
        return;
    }

#ifdef USE_WEBVIEW2_WIN10
    m_wincompCompositor = nullptr;
#endif
    LPCWSTR subFolder = nullptr;
    auto options = Microsoft::WRL::Make<CoreWebView2EnvironmentOptions>();
    options->put_AllowSingleSignOnUsingOSPrimaryAccount(FALSE);

    HRESULT hr = CreateCoreWebView2EnvironmentWithOptions(subFolder, nullptr, options.Get(), Microsoft::WRL::Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(this, &CEdgeBrowserControl::OnCreateEnvironmentCompleted).Get());

    if (!SUCCEEDED(hr))
    {
        if (hr == HRESULT_FROM_WIN32(ERROR_FILE_NOT_FOUND))
        {
            TRACE(_T("Couldn't find Edge installation. Do you have a version installed that is compatible with this "));
        }
        else
        {
            AfxMessageBox(_T("Failed to create webview environment"));
        }
    }
}

HRESULT CEdgeBrowserControl::DCompositionCreateDevice2(IUnknown* renderingDevice, REFIID riid, void** ppv)
{
    HRESULT hr = E_FAIL;
    static decltype(::DCompositionCreateDevice2)* fnCreateDCompDevice2 = nullptr;
    if (fnCreateDCompDevice2 == nullptr)
    {
        HMODULE hmod = ::LoadLibraryEx(L"dcomp.dll", nullptr, 0);
        if (hmod != nullptr)
        {
            fnCreateDCompDevice2 = reinterpret_cast<decltype(::DCompositionCreateDevice2)*>(
                ::GetProcAddress(hmod, "DCompositionCreateDevice2"));
        }
    }
    if (fnCreateDCompDevice2 != nullptr)
    {
        hr = fnCreateDCompDevice2(renderingDevice, riid, ppv);
    }
    return hr;
}

void CEdgeBrowserControl::CloseWebView(bool cleanupUserDataFolder)
{
    if (m_controller)
    {
        m_controller->Close();
        m_controller = nullptr;
        m_webView = nullptr;
    }
    m_webViewEnvironment = nullptr;
    if (cleanupUserDataFolder)
    {
        //Clean user data        
    }
}

HRESULT CEdgeBrowserControl::OnCreateEnvironmentCompleted(HRESULT result, ICoreWebView2Environment* environment)
{
    m_webViewEnvironment = environment;
    m_webViewEnvironment->CreateCoreWebView2Controller(this->GetSafeHwnd(), Microsoft::WRL::Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(this, &CEdgeBrowserControl::OnCreateCoreWebView2ControllerCompleted).Get());

    return S_OK;
}

#include <wil/com.h>
#include <wil/resource.h>

using namespace Microsoft::WRL;
HRESULT CEdgeBrowserControl::OnCreateCoreWebView2ControllerCompleted(HRESULT result, ICoreWebView2Controller* controller)
{
    if (result == S_OK)
    {
        m_controller = controller;
        Microsoft::WRL::ComPtr<ICoreWebView2> coreWebView2;
        m_controller->get_CoreWebView2(&coreWebView2);
        m_controller->put_IsVisible(true);
        m_webView = coreWebView2.Get();

        NewComponent<ViewComponent>(
            this, m_dcompDevice.Get(),
#ifdef USE_WEBVIEW2_WIN10
            m_wincompCompositor,
#endif
            m_creationModeId == IDM_CREATION_MODE_TARGET_DCOMP);

        if (!m_webView)
            return S_FALSE;

        RegisterEventHandler();

        GetParent()->PostMessage(WMU_NOTIFYWEBLOADCOMPLETE, 0, 0);
    }
    else
    {
        TRACE(_T("Failed to create webview"));
    }
    return S_OK;
}

BOOL CEdgeBrowserControl::Navigator(LPCTSTR lpszAddress)
{
    if (!m_webView)
        return FALSE;

    if (m_webView->Navigate(lpszAddress) != S_OK)
        return FALSE;

    ResizeEverything();

    return TRUE;
}

BEGIN_MESSAGE_MAP(CEdgeBrowserControl, CWnd)
    ON_WM_CREATE()
END_MESSAGE_MAP()

static LONG_PTR gpOldWndProc = NULL; // 이전 윈도우 프로시져 주소
LRESULT CALLBACK WndProcStatic(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    auto app = (CEdgeBrowserControl*)GetWindowLongPtr(hWnd, GWLP_USERDATA);
    if(!app)
        return DefWindowProc(hWnd, message, wParam, lParam);
    
    auto view = app->GetComponent<ViewComponent>();
    if (!view)
        return DefWindowProc(hWnd, message, wParam, lParam);

    LRESULT result;
    if (view->HandleWindowMessage(hWnd, message, wParam, lParam, &result))
        return 0;

    return DefWindowProc(hWnd, message, wParam, lParam);
}

int CEdgeBrowserControl::OnCreate(LPCREATESTRUCT lpCreateStruct)
{
    if (CWnd::OnCreate(lpCreateStruct) == -1)
        return -1;
    
    gpOldWndProc = (LONG_PTR)SetWindowLongPtr(this->GetSafeHwnd(), GWLP_WNDPROC, (LONG_PTR)WndProcStatic);
    SetWindowLongPtr(this->GetSafeHwnd(), GWLP_USERDATA, (LONG_PTR)this);

    return 0;
}

void CEdgeBrowserControl::DestroyWebView()
{
    if (gpOldWndProc)
    {
        SetWindowLongPtr(this->GetSafeHwnd(), GWLP_WNDPROC, (LONG_PTR)gpOldWndProc);
        gpOldWndProc = NULL;
    }
}

void CEdgeBrowserControl::RegisterEventHandler()
{
    m_webView->add_DocumentTitleChanged(
        Callback<ICoreWebView2DocumentTitleChangedEventHandler>(
            [this](ICoreWebView2* sender, IUnknown* args) -> HRESULT {
                wil::unique_cotaskmem_string title;
                sender->get_DocumentTitle(&title);
                //TRACE(_T("title : %s\n"), title.get());
                GetParent()->SendMessage(WMU_NOTIFYWEBTITLECHANGE, (WPARAM)title.get(), 0);
                return S_OK;
            })
        .Get(),
                &m_titleChangedToken);

    m_webView->add_NavigationCompleted(
        Callback<ICoreWebView2NavigationCompletedEventHandler>(
            [this](ICoreWebView2* sender, ICoreWebView2NavigationCompletedEventArgs* args) -> HRESULT {
                wil::unique_cotaskmem_string uri;
                sender->get_Source(&uri);
                //TRACE(_T("uri : %s\n"), uri.get());
                GetParent()->SendMessage(WMU_NOTIFYWEBNAVCOMPLETE, (WPARAM)uri.get(), 0);
                return S_OK;
            })
        .Get(),
                &m_NavigationCompletedToken);
}

void CEdgeBrowserControl::RemoveEventHandler()
{
    m_webView->remove_DocumentTitleChanged(m_titleChangedToken);
    m_webView->remove_NavigationCompleted(m_NavigationCompletedToken);
}

void CEdgeBrowserControl::Reload()
{
    m_webView->Reload();
}

void CEdgeBrowserControl::SetZoomFactor(float fZoom)
{
    auto view = GetComponent<ViewComponent>();
    if (!view)
        return;

    view->SetZoomFactor(fZoom);
}

float CEdgeBrowserControl::GetZoomFactor()
{
    auto view = GetComponent<ViewComponent>();
    if (!view)
        return 1.0;

    return view->GetZoomFactor();
}

void CEdgeBrowserControl::SaveScreenshot(CString strName)
{
    auto view = GetComponent<ViewComponent>();
    if (!view)
        return;

    view->SaveScreenshot(strName);
}