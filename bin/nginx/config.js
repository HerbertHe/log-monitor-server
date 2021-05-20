const nginxConf = (serverName, ssl = false) => {
    const configs = [
        "server {",
        "\tlisten 80;",
        `\tserver_name ${serverName};`,
        `\taccess_log /logm.access.log`,
        `\tlocation / {`,
        `\t\t`,
        `\t}`,
        "}",
    ].join("\n")
}
