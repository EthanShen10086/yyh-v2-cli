# yyh-v2-cli

## usage

### download CLI
```
pnpm install yyh-v2-cli -g
```
### config CLI into env
```
pnpm link -g
```

### download vue2.7+setup+element-ui built-in project

cd {{ XXX/path }} then execute this command 
```
yyh-v2-cli create {{ project-name }}
```


## action

1. create project action
```
yyh-v2-cli create project-name

```
2. create vue component action

```
yyh-v2-cli addcomp {{ component-name }} -d {{ destination-name }}
```

## advantage

When you execute `create` action after downloading and running webpack serve project, the project will automatically open in the browser. If a specific port was occupied, the CLI will automatically switch to an available port.