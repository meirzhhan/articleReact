import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isAbsolute(value: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'pages', 'widgets'];

  return layers.some((layer) => value.startsWith(layer));
}

files.forEach((sourceFile) => {
  const importDeclarations = sourceFile.getImportDeclarations();

  importDeclarations.forEach((importDecl) => {
    const value = importDecl.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDecl.setModuleSpecifier(`@/${value}`);
    }
  });
});

project.save();
