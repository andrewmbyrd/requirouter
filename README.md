# requirouter package

requirouter is designed to allow ease of use when requiring files as dependecies in your projects.

You can find and install this package by opening your Atom text editor, and pressing ctrl+shift+p.

![package install](http://i.imgur.com/PMXYA7x.png)

From there, search 'requirouter' and you can install the package.

This functionality works by selecting the file to be required, and putting it into the currently-active text editor window.

So, given the following tree structure:

![Tree Structure](http://i.imgur.com/FJwvkdx.png)

Let's say we want to require Fun.rb in Hello.rb. Navigate into Hello.rb so that it is your Active Text Editor (you can type in there).

![Tree Structure](http://i.imgur.com/QIYYiyG.png)

The fastest way is to right-click on the desired file in the Tree View and select `Get Path String`.


![Tree Structure](http://i.imgur.com/os3XJfa.gif)

That's it! The file is now correctly required at the top of the file, with no need to modify the $LOAD_PATH.

There are alternative methods as well. To accomplish the same goal, highlight Fun.rb in the Atom Tree View. This can conveniently be done by holding `ctrl` and making sure only the desired file is highlighted by clicking in the Tree View.

![Tree Structure](http://i.imgur.com/ZHmjo5a.gif)

Now that we have the desired file selected, we can go back into Hello.rb and use the keyboard shortcut `ctrl+alt+p` to paste in the proper path for requirement. The package automatically inserts this line of text at the top of the file.

Alternatively, you can right-click in the text editor and select `Get Path String` from the menu.

![Tree Structure](http://i.imgur.com/ouiJjNV.gif)
