const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateShortUrl(req, res) {
    let body = req.body;

    if (!body.url) return res.status(400).json({ "error": "url is Required" });
    let shortId = shortid()

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    // let urls = await URL.find({_id : req.user._id})
    return res.render("home", {id: shortId,});

}

async function handleAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    res.json({
        "Total Clicks": result.visitHistory.length,
        "Analytics": result.visitHistory
    })
}

module.exports = {
    handleGenerateShortUrl,
    handleAnalytics
}