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

    //obtain an array of the full file path of the current active
    //text editor. array contains directory names last element
    //is a file name
    if (editor = atom.workspace.getActiveTextEditor()){
      thisPathArray = `${editor.getPath()}`.split("/");
    }

    //obtain the path string of the Selected DOM element
    //(from the tree view)
    let selectedFiles = document.getElementsByClassName('selected');
    //if this function is invoked and there isn't a file selected,
    //notify an error
    if(selectedFiles.length == 0){
      atom.notifications.addError("From package requirouter: Please highlight a file in the Tree View", {
        dismissable:true});
    }

    for(var n = 0; n < selectedFiles.length; n++){
      let path = selectedFiles[n].firstChild.getAttribute('data-path');
      let finalRequireString = "";
      //if this function is invoked and a directory is selected,
      //notify an warning
      if (!path){
        atom.notifications.addWarning("Please select a FILE from the Tree View",
        {description: `${selectedFiles[n].firstChild.firstChild.getAttribute('title')} is a directory, not a file. Select the desired file by holding CTRL and clicking on the desired file name.`,
         dismissable: true});

      }else{

        //else get the path as an array, and draw the correct
        //relative path from the current active text file
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


      //input the text at the top of the file
      editor.setCursorScreenPosition([0,0], {autoscroll: true});
      editor.insertText(`require_relative '${finalRequireString}' \n`);
    }
    
    }

  }

};
