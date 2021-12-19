import {Router } from "express"
import VideosDAO from "../models/videosModel.js";
import memCache from 'memory-cache';
import errs from '../error/index.js';
const ROUTER = Router();
let videos = new VideosDAO();


async function cache(...params) {
    let result;
    if (typeof params[0] === 'string') {
        switch (params.length) {
            case 1:
                result = await memCache.get(params[0]);
                result = JSON.parse(result);
                break;
            case 2:
                if (params[1] instanceof Object) {
                    result = memCache.put(params[0], JSON.stringify(params[1]),2.16e+7);
                }
                break;
            default:
                result = null;
        }
    }
    return result;
}

// Api apresentation page

ROUTER.get('/', (req, res) => {
    res.send('<h1>in constructtion</h1>');
});

ROUTER.get('/videos', async (req, res) => {
    let { q, order } = req.query;

    if (q != undefined && q.length > 0) {
        let list = await cache(q);
        if (list === null){
            if (order != undefined && order.length > 0) {
                try {
                    list = await videos.listAll(q, order);
                } catch (error) {
                    errs.displayError(error);
                }
            }
            else {
                try {
                    list = await videos.listAll(q);
                } catch (error) {
                    errs.displayError(error);
                }
            }
            if (list instanceof Array) {
                res.status(200).send(list);
                await cache(q,list);
            }
            else {
                res.status(500).send('Internal error in processing the request. Please contact your administrator');
            }
        }
        else{
            res.status(200).send(list);
        }
    }
    else {
        res.status(400).send("Query was not entered or is empty");
    }
});

ROUTER.get('/video', async (req, res) => {
    let id = req.query.id;
    if (typeof (id) === 'string' && id.length > 0) {
        let video = null
        try {
            video = await videos.videoInfo(id, 'id, snippet, contentDetails,statistics,topicDetails')
        }
        catch (error) {
            res.status(500).send('Internal error in processing the request. Please contact your administrator');
        }
        res.status(200).send(video);
    }
    else {
        res.status(400).send("'id' was not entered or is empty");
    }
})

export default ROUTER;