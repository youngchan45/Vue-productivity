import {fetchGet} from "../request/http.js"

export const getWarnInfo=p=>fetchGet("/warn/indexWarnInfo",p)