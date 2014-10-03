# Installing

Create a `package.json` file in the directory of interest, if it does not exist already, with the `npm init` command.

```
$ npm init
```

Express can then be installed in the directory and saved in the dependecies list with the following command.

```
$ npm install express --save
```

If the installation is intended to be temporarily and express need not be added to the dependecies list, install express without the `--save` option.

```
$ npm install express
```

<div class="doc-box doc-tip">
Node modules installed with the `--save` option gets added to the `dependencies` list in the `package.json` file. Modules in the dependecies are automatically installed when the `npm install` command executed in a node application directory.
</div>
