// ./workspaceFeatures/multiselectPlugin.js

function initializeMultiselect(workspace) {
    const multiselectPlugin = new Multiselect(workspace);
    multiselectPlugin.init({
        multiselectIcon: {
            hideIcon: false,
            weight: 3,
            enabledIcon: 'https://github.com/mit-cml/workspace-multiselect/raw/main/test/media/select.svg',
            disabledIcon: 'https://github.com/mit-cml/workspace-multiselect/raw/main/test/media/unselect.svg'
        },
        multiselectCopyPaste: {
            crossTab: true,
            menu: true,
        },
    });
}
