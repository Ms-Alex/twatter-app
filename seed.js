module.exports = {
	"undefined": process.env.MONGODB_URI || "mongodb://localhost/twatter",
	"dev": process.env.MONGODB_URI || "mongodb://localhost/twatter",
	"prod": process.env.MONGODB_URI || "mongodb://localhost/twatter"
}