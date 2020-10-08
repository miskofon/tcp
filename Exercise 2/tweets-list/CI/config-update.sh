#!/bin/bash

CONFIG_FILE=/usr/share/nginx/html/config.json
CONFIG_FILE_OWN=$(stat -c '%U:%G' $CONFIG_FILE)
CONFIG_FILE_MOD=$(stat -c '%a' $CONFIG_FILE)

# Currenty properties to change are set in script but can be imported from external file 
CONFIG_PROPERTIES=$(cat <<_EOT
api_url:${JM_API_URL}
auth.auth_server_url:${JM_AUTH_SERVER_URL}
auth.origin_url:${JM_WEB_APP_URL}
_EOT
)

if ! which jq &>/dev/null; then
    echo "Missing 'jq' command. Please make sure 'jq' is installed and added to PATH"
    exit 1
fi

populate_config() {
    [[ -z "${1}" || -z "${2}" ]] && return
    local json_path="$1"
    local json_replace_val="$2"
    local tmp=$(mktemp)
    echo "Changing value to '${json_replace_val}' in config key '${json_path}'"
    if ! jq -r ".${json_path} = \"$json_replace_val\"" "$CONFIG_FILE" > "$tmp"; then
        echo "Cannot replace config property '${json_path}' in ${CONFIG_FILE}"
        exit 1
    fi
    chmod $CONFIG_FILE_MOD "$tmp" &>/dev/null \
    && chown $CONFIG_FILE_OWN "$tmp" &>/dev/null \
    && mv "$tmp" $CONFIG_FILE &>/dev/null
}

read_change_values() {
    while read json_line; do
        local json_path=${json_line%%:*}
        local json_value=${json_line#"${json_path}:"}
        populate_config "${json_path}" "${json_value}"
    done <<< $1
}

read_change_values "$CONFIG_PROPERTIES"
exit 0