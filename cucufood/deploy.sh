#!/bin/bash

# Inicializa git si no existe
if [ ! -d ".git" ]; then
  git init
fi

# Agrega todos los archivos
git add .

# Commit con mensaje
git commit -m "Deploy initial version"

# Agrega el repositorio remoto (solo la primera vez)
git remote add origin https://github.com/Eineralvear777/cucufood 2>/dev/null

# Sube los cambios
git branch -M main
git push -u origin main
