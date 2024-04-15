document.addEventListener('DOMContentLoaded', function() {
  var workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      grid:
          {spacing: 20,
           length: 3,
           colour: '#ccc',
           snap: true},
      trashcan: true
  });

  function centerBlock(block) {
      var metrics = workspace.getMetrics();
      var x = (metrics.viewWidth - block.width) / 2;
      block.moveBy(x, 20);
  }

  workspace.addChangeListener(function(event) {
      if (event.type == Blockly.Events.BLOCK_CREATE) {
          var block = workspace.getBlockById(event.blockId);
          centerBlock(block);
      }
  });

  // Blockly 툴박스를 커스터마이징하여 항상 열린 상태를 유지하는 방법
  var toolboxElement = document.getElementsByClassName('blocklyToolboxDiv')[0];
  if (toolboxElement) {
      toolboxElement.addEventListener('click', function(event) {
          event.stopPropagation();  // 클릭 이벤트가 상위로 전파되지 않도록 함
      }, true);
  }
});
