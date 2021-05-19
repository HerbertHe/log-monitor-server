export interface IAccessLog {
    [index: string]: any
    key?: any
    ip: string
    time: string
    request: string
    status: string
    bytes: string
    referrer: string
    ua: string
    raw: string
}

export interface INginxErrorLog {
    [index: string]: any
    key?: any
    raw: string
    time: string
    level: string
    pid: string
    number: string
    message: string
    client: string
    server: string
    request: string
    upstream: string
    host: string
    referrer: string
}

export interface IApacheErrorLog {
    [inex: string]: any
    key?: any
    raw: string
    time: string
    level: string
    client: string
    message: string
}
