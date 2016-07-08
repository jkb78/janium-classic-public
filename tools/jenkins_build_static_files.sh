#!/bin/bash
# jenkins_build_static_files.sh
#
# $GOOGLE_DRIVE_PATH: La ruta al directorio (conectado a Google Drive) donde
#                      se coloca el paquete producido por el proceso.

# actualizar módulos
npm install

# compilar
gulp

# empaquetar
cd dist
rm -f "${GOOGLE_DRIVE_PATH}"/htdocs.zip
zip -9r "${GOOGLE_DRIVE_PATH}"/htdocs.zip htdocs/*
cd ..

# publicar
cd "${GOOGLE_DRIVE_PATH}"
drive push --no-prompt htdocs.zip
