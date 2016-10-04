#!/bin/bash
set -x
# jenkins_build_custom_static_files.sh
#
# $INBOX: Directorio de entrada (conectado a Google Drive)
# $OUTBOX: Directorio de salida (conectado a Google Drive)

# actualizar módulos
npm install

echo "Limpiando INBOX y OUTBOX locales..."
rm -f "${INBOX}"/*
rm -f "${OUTBOX}"/*

echo "Obteniendo INBOX y OUTBOX..."
pushd "${INBOX}" >/dev/null 2>&1
        drive pull --no-prompt
popd >/dev/null 2>&1
pushd "${OUTBOX}" >/dev/null 2>&1
        drive pull --no-prompt
popd >/dev/null 2>&1

inbox_is_empty=$(ls -A "$INBOX")
if [ "$inbox_is_empty" = "" ]; then
        echo "*** INBOX vacio"
        exit 0
fi

echo "Por mis pistolas..."
sleep 10

for json_path in "$INBOX"/*.json
do
        json=$(basename "$json_path")

        echo -n "Procesando ${json}..."

        custom_name=$(echo $json | sed -e 's/[.]json$//')

        rm -f custom.json
        cp "${json_path}" custom.json

        gulp build-custom-skins \
                >/tmp/gulp-build-custom-skins.out \
                2>&1

        if [ $? -ne 0 ]
        then
                echo "   (ERR)"
                cp /tmp/gulp-build-custom-skins.out \
                        "/${OUTBOX}/${custom_name}.err"
        else
                echo "   (OK)"
                pushd dist/htdocs/css >/dev/null 2>&1
                        zip -q "/${OUTBOX}/${custom_name}.zip" \
                                janium/custom/janium_skins.min.css \
                                janium/custom/bootstrap-datepicker3.min.css.map
                popd >/dev/null 2>&1
        fi

        echo "  moviendo archivo a OUTBOX..."
        pushd "${INBOX}" >/dev/null 2>&1
            # en "mv" OUTBOX es "relativo remoto"
            drive mv "${custom_name}.json" ../OUTBOX
        popd >/dev/null 2>&1
done

echo "Sincronizando OUTBOX..."
echo "   ( los errores de permisos de drive probablemente sean inofensivos...)"
pushd "${OUTBOX}" >/dev/null 2>&1
        drive push --no-prompt
popd >/dev/null 2>&1

echo "Sincronizando INBOX..."
pushd "${INBOX}" >/dev/null 2>&1
        drive pull --no-prompt
popd >/dev/null 2>&1
