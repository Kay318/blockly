// XTPApplication1.cpp : Defines the class behaviors for the application.
//
// Generated by Codejock Toolkit Pro Application Wizard.
// Contact information:
//     support@codejock.com
//     http://www.codejock.com
//

#include "stdafx.h"
#include <afxdialogex.h>
#include "XTPApplication1.h"
#include "MainFrm.h"

#include "ChildFrm.h"
#include "XTPApplication1Doc.h"
#include "XTPApplication1View.h"

#include <Shlwapi.h>
#pragma comment(lib, "Shlwapi")

#ifdef _DEBUG
#define new DEBUG_NEW
#endif



// CXTPApplication1App

IMPLEMENT_DYNAMIC(CXTPApplication1App, CXTPWinApp);

BEGIN_MESSAGE_MAP(CXTPApplication1App, CXTPWinApp)
	ON_COMMAND(ID_APP_ABOUT, &CXTPApplication1App::OnAppAbout)
	// Standard file based document commands
	ON_COMMAND(ID_FILE_NEW, &CXTPWinApp::OnFileNew)
	ON_COMMAND(ID_FILE_OPEN, &CXTPWinApp::OnFileOpen)

END_MESSAGE_MAP()

// The one and only CXTPApplication1App object
CXTPApplication1App theApp;

// CXTPApplication1App construction

CXTPApplication1App::CXTPApplication1App()
{

	// TODO: replace application ID string below with unique ID string; recommended
	// format for string is CompanyName.ProductName.SubProduct.VersionInformation
	SetAppID(_T("XTPApplication1.AppID.NoVersion"));

	// TODO: add construction code here,
	// Place all significant initialization in InitInstance
}

CXTPApplication1App::~CXTPApplication1App()
{
	// TODO: add cleanup code here
}

// CXTPApplication1App initialization

BOOL CXTPApplication1App::InitInstance()
{
	// InitCommonControlsEx() is required on Windows XP if an application
	// manifest specifies use of ComCtl32.dll version 6 or later to enable
	// visual styles.  Otherwise, any window creation will fail.
	INITCOMMONCONTROLSEX InitCtrls;
	InitCtrls.dwSize = sizeof(InitCtrls);
	// Set this to include all the common control classes you want to use
	// in your application.
	InitCtrls.dwICC = ICC_WIN95_CLASSES;
	InitCommonControlsEx(&InitCtrls);

	CXTPWinApp::InitInstance();

	// Initialize OLE libraries
	if (!AfxOleInit())
	{
		AfxMessageBox(IDP_OLE_INIT_FAILED, MB_ICONERROR);
		return FALSE;
	}

	AfxEnableControlContainer();
	CXTPWinDwmWrapper().SetProcessDPIAware();

#if _MSC_VER <= 1200 //MFC 6.0 or earlier
#ifdef _AFXDLL
	Enable3dControls();         // Call this when using MFC in a shared DLL
#else
	Enable3dControlsStatic();   // Call this when linking to MFC statically
#endif
#endif

	// Standard initialization
	// If you are not using these features and wish to reduce the size
	// of your final executable, you should remove from the following
	// the specific initialization routines you do not need
	// Change the registry key under which our settings are stored
	// TODO: You should modify this string to be something appropriate
	// such as the name of your company or organization
	SetRegistryKey(_T("Codejock Toolkit Pro AppWizard-Generated Applications"));
	LoadStdProfileSettings();  // Load standard INI file options (including MRU)

	InitVisualStyles();

	SAFE_DELETE(m_pRecentFileList);
	m_pRecentFileList = new CXTPRecentFileList(0, _T("Recent File List"),
		_T("File%d"), 10);
	m_pRecentFileList->ReadList();

	// Register the application's document templates.  Document templates
	//  serve as the connection between documents, frame windows and views
	CMultiDocTemplate* pDocTemplate = new CMultiDocTemplate(
		IDR_MAINFRAME,
		RUNTIME_CLASS(CXTPApplication1Doc),
		RUNTIME_CLASS(CChildFrame), // Custom MDI child frame
		RUNTIME_CLASS(CXTPApplication1View));
	AddDocTemplate(pDocTemplate);

	// create main MDI Frame window
	CMainFrame* pMainFrame = new CMainFrame;
	if (!pMainFrame->LoadFrame(IDR_MAINFRAME))
	{
		delete pMainFrame;
		AfxMessageBox(IDP_OLE_INIT_FAILED, MB_ICONERROR);
		return FALSE;
	}

	m_pMainWnd = pMainFrame;

	// Parse command line for standard shell commands, DDE, file open
	CCommandLineInfo cmdInfo;
	ParseCommandLine(cmdInfo);

	// Dispatch commands specified on the command line.  Will return FALSE if
	// app was launched with /RegServer, /Register, /Unregserver or /Unregister.
	if (!ProcessShellCommand(cmdInfo))
		return FALSE;

	// The main window has been initialized, so show and update it
	m_pMainWnd->ShowWindow(m_nCmdShow);
	m_pMainWnd->UpdateWindow();



	return TRUE;
}

int CXTPApplication1App::ExitInstance()
{
	//TODO: handle additional resources you may have added
	AfxOleTerm(FALSE);

	return CXTPWinApp::ExitInstance();
}

void CXTPApplication1App::OnAppAbout()
{
	CAboutDlg aboutDlg;
	aboutDlg.DoModal();
}

XTPPaintTheme CXTPApplication1App::GetAppTheme(XTPPaintTheme nDefaultTheme /*= xtpThemeNone*/) const
{
	UINT nTheme = const_cast<CXTPApplication1App*>(this)->GetProfileInt(_T(""), _T("Theme"), nDefaultTheme);
	return static_cast<XTPPaintTheme>(nTheme);
}

CString CXTPApplication1App::GetAppThemeSettings(LPCTSTR lpDefaultSettings /*= NULL*/)
{
	CString strThemeSettings = const_cast<CXTPApplication1App*>(this)->GetProfileString(
		_T(""), _T("ThemeSettings"), lpDefaultSettings);
	strThemeSettings.MakeUpper();
	return strThemeSettings;
}

void CXTPApplication1App::SetAppTheme(XTPPaintTheme nTheme, 
	LPCTSTR lpThemeSettings /*= NULL*/, BOOL bUpdateResources /*= TRUE*/)
{
	if (NULL != lpThemeSettings)
	{
		XTPThemeDLL()->SetHandle(lpThemeSettings);
	}
	else
	{
		XTPThemeDLL()->Reset();
	}

	XTPPaintManager()->SetTheme(nTheme);

	WriteProfileInt(_T(""), _T("Theme"), nTheme);

	CString strThemeSettings;
	if (NULL != lpThemeSettings)
	{
		strThemeSettings = lpThemeSettings;
		strThemeSettings.MakeUpper();
	}

	WriteProfileString(_T(""), _T("ThemeSettings"), strThemeSettings);
}

void CXTPApplication1App::InitVisualStyles()
{
	XTPPaintTheme nTheme = GetAppTheme(xtpThemeOffice2016);
	CString strThemeSettings = GetAppThemeSettings(xtpIniOffice2016AccessColorful);
	SetAppTheme(nTheme, strThemeSettings);
}

BOOL CXTPApplication1App::GetStylesPath(CString& strPath, LPCTSTR lpFileName /*= NULL*/)
{
	TCHAR szPath[MAX_PATH + 1] = { _T('\0') };
	if (0 == ::GetModuleFileName(AfxGetApp()->m_hInstance, szPath, MAX_PATH + 1))
	{
		TRACE(_T("ERROR: Unable to obtain module file name.\n"));
		return FALSE;
	}

	::PathRemoveFileSpec(szPath);

	SIZE_T cchAdditional = 1 + _tcslen(_T("Styles")) + (NULL != lpFileName ? 1 + _tcslen(lpFileName) : 0) + 1;
	if (_countof(szPath) < (_tcslen(szPath) + cchAdditional))
	{
		TRACE(_T("ERROR: Style path is too long.\n"));
		return FALSE;
	}

	if (!::PathAppend(szPath, _T("Styles")))
	{
		TRACE(_T("ERROR: Unable to append path.\n"));
		return FALSE;
	}

	if (NULL != lpFileName)
	{
		if (!::PathAppend(szPath, lpFileName))
		{
			TRACE(_T("ERROR: Unable to append path.\n"));
			return FALSE;
		}
	}

	strPath = szPath;

	return TRUE;
}


// CXTPApplication1App message handlers


// CAboutDlg dialog used for App About

IMPLEMENT_DYNAMIC(CAboutDlg, CDialogEx);

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
END_MESSAGE_MAP()

CAboutDlg::CAboutDlg() : CDialogEx(IDD_ABOUTBOX)
{
	// TODO: add member initialization code here
}

CAboutDlg::~CAboutDlg()
{
	// TODO: add cleanup code here
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	// TODO: add your data exchange here
}


