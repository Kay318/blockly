#pragma once

#include <wrl.h>
#include "WebView2EnvironmentOptions.h"
#include "WebView2.h"

#include "ComponentBase.h"
#include <dcomp.h>
#include <functional>
#include <memory>

#define WMU_NOTIFYWEBLOADCOMPLETE		(WM_USER + 200)
#define WMU_NOTIFYWEBTITLECHANGE		(WM_USER + 201)
#define WMU_NOTIFYWEBNAVCOMPLETE		(WM_USER + 202)

#ifdef USE_WEBVIEW2_WIN10
#include <winrt/Windows.UI.Composition.h>
#include <winrt/Windows.UI.ViewManagement.h>
namespace winrtComp = winrt::Windows::UI::Composition;
#endif

class CEdgeBrowserControl : public CWnd
{
	// Construction
public:
	CEdgeBrowserControl(CWnd* pParent = nullptr);
	~CEdgeBrowserControl();

	void InitializeWebView();
	void CloseWebView(bool cleanupUserDataFolder = false);
	HRESULT OnCreateEnvironmentCompleted(HRESULT result, ICoreWebView2Environment* environment);
	HRESULT OnCreateCoreWebView2ControllerCompleted(HRESULT result, ICoreWebView2Controller* controller);
	void RunAsync(std::function<void(void)> callback);
	void ResizeEverything();
	HRESULT DCompositionCreateDevice2(IUnknown* renderingDevice, REFIID riid, void** ppv);
	BOOL Navigator(LPCTSTR lpszAddress);

	ICoreWebView2Controller* GetWebViewController()
	{
		return m_controller.Get();
	}
	ICoreWebView2* GetWebView()
	{
		return m_webView.Get();
	}
	ICoreWebView2Environment* GetWebViewEnvironment()
	{
		return m_webViewEnvironment.Get();
	}
	HWND GetMainWindow()
	{
		return this->GetSafeHwnd();
	}

	// Implementation
protected:
	DWORD m_creationModeId = 0;
	Microsoft::WRL::ComPtr<ICoreWebView2Environment> m_webViewEnvironment;
	Microsoft::WRL::ComPtr<ICoreWebView2Controller> m_controller;
	Microsoft::WRL::ComPtr<ICoreWebView2> m_webView;
	Microsoft::WRL::ComPtr<IDCompositionDevice> m_dcompDevice;
	std::vector<std::unique_ptr<ComponentBase>> m_components;
	HWND m_mainWindow = nullptr;
	HINSTANCE g_hInstance;
	static constexpr size_t s_maxLoadString = 100;
	template <class ComponentType, class... Args> void NewComponent(Args&&... args);
public:
	template <class ComponentType> ComponentType* GetComponent();
public:
	DECLARE_MESSAGE_MAP()
	afx_msg int OnCreate(LPCREATESTRUCT lpCreateStruct);
public:
	void DestroyWebView();
	void Reload();
	void SetZoomFactor(float fZoom);
	float GetZoomFactor();
	void SaveScreenshot(CString strName);

private:
	void RegisterEventHandler();
	void RemoveEventHandler();

	EventRegistrationToken m_titleChangedToken = {};
	EventRegistrationToken m_NavigationCompletedToken = {};
};

template <class ComponentType, class... Args> void CEdgeBrowserControl::NewComponent(Args&&... args)
{
	m_components.emplace_back(new ComponentType(std::forward<Args>(args)...));
}

template <class ComponentType> ComponentType* CEdgeBrowserControl::GetComponent()
{
	for (auto& component : m_components)
	{
		if (auto wanted = dynamic_cast<ComponentType*>(component.get()))
		{
			return wanted;
		}
	}
	return nullptr;
}

