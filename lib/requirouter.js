'use babel';


import RequirouterView from './requirouter-view';
import { CompositeDisposable } from 'atom';

export default {

  requirouterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.requirouterView = new RequirouterView(state.requirouterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.requirouterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'requirouter:getPath': () => this.getPath()
    }));


  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.requirouterView.destroy();
  },

  serialize() {
    return {
      requirouterViewState: this.requirouterView.serialize()
    };
  },

  toggle() {
   console.log('Toggled Requirouter!');
   return (
     this.modalPanel.isVisible() ?
     this.modalPanel.hide() :
     this.modalPanel.show()
   );
  },

  getPath() {
    let editor;
    let thisPathArray;
    let pointOfDivergence;
    let finalRequireString = "";

    if (editor = atom.workspace.getActiveTextEditor()){
      thisPathArray = `${editor.getPath()}`.split("/");
    }

    console.log(editor.editorElement)

    let selectedFiles = document.getElementsByClassName('selected');
    let path = selectedFiles[0].firstChild.getAttribute('data-path');

    if (!path){
      atom.notifications.addWarning("Please select a file from the Tree View",
      {description: "Please select a file name (not a directory) from the file Tree View. Select the desired file by holding CTRL or CMD and clicking on the desired file name.",
       dismissable: true});

    }else{

      let requiredFilePathArray = `${path}`.split("/");

      for(var i = 1; i < thisPathArray.length; i++){
        if (thisPathArray[i] != requiredFilePathArray[i]){
          pointOfDivergence = i;
          break;
        }
      }

      for(var j = pointOfDivergence; j < thisPathArray.length; j++){
        if(j < thisPathArray.length - 1){
          finalRequireString += "../";
        }
      }

      for(var k = pointOfDivergence; k < requiredFilePathArray.length; k++){
        finalRequireString += `${requiredFilePathArray[k]}`
        if(k < requiredFilePathArray.length - 1){
          finalRequireString += "/"
        }
      }
    }

    editor.setCursorScreenPosition([1,0], {autoscroll: true});
    editor.insertText(`require_relative '${finalRequireString}' \n`);

  }

};
