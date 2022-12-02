const notFound = (req, res) => {
    res.status(404).send("The page is not available")
}

module.exports = notFound