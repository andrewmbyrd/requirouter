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
    let editor
    if (editor = atom.workspace.getActiveTextEditor()){
      console.log(editor);
      editor.insertText(editor.getPath());
    }
    let regex = new RegExp('h="(.+)"')
    let selectedFiles = document.getElementsByClassName('selected');
    let path = selectedFiles[0].firstChild.getAttribute('data-path');
    //editor.insertText(path);
    console.log(path)

  }

};
