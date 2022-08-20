import * as http from "http"
import * as url from "url";
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 7000;

const server = http.createServer(async (req, res) => {

    // Fetch Get sending data via search Params
    if (req.url && req.method === "GET" && typeof url.parse(req.url, true).query.int1 === "string" && typeof url.parse(req.url, true).query.int2 === "string"){
        try {
            const urlValues = url.parse(req.url, true);
            const qInt1 = urlValues.query.int1 ?? "";
            const qInt2 = urlValues.query.int2 ?? "";
            let int1 = 0;
            let int2 = 0;
            let sum = 0;
            if (typeof qInt1 === 'string') {
                int1 = parseInt(qInt1);
            }
            if (typeof qInt2 === 'string') {
                int2 = parseInt(qInt2);
            }
            sum = int1 + int2;
            // set the status code, and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(sum));
        }
        catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // Fetch Get sending data via post body
    else if (req.url === "/api/sums/" && req.method === "POST" || req.url === "/api/sums" && req.method === "POST") {
        try {
        let sum_data = await getReqData(req);
        let jsonSumData = JSON.parse(sum_data);
        let int1 = 0;
        let int2 = 0;
        let sum = 0;
        if (sum_data && typeof jsonSumData.firstNumber === "number" && typeof jsonSumData.secondNumber === "number") {
            if (typeof jsonSumData.firstNumber === 'number') {
                int1 = jsonSumData.firstNumber;
            }
            if (typeof jsonSumData.secondNumber === 'number') {
                int2 = jsonSumData.secondNumber;
            }
            sum = int1 + int2;
            // set the status code, and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(sum));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error for Missing FormData
            res.end(JSON.stringify({ message: "Missing FormData" }));
        }
        }
        catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});