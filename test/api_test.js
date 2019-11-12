const supertest = require('supertest');
const expect = require('chai').expect;
const mocha = require('mocha')
const fs = require('fs');

const test_data = JSON.parse(fs.readFileSync('./data/test_data.json', 'utf8'));
const baseUrl = supertest("restful-booker.herokuapp.com");
const apiEndPoint = "/booking/1";

var response;
var body;

const call_booking_api = async function (request_body) {
    return baseUrl.get(apiEndPoint)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send(request_body);
}


describe(`Testing the API in mocha, chai framework`, function () {

        before(async function () {
            response = await call_booking_api(test_data);
            body = response.body;
        });

        it('status code is 200', function () {
            expect(response.status).to.equal(200);
        });

        it("firstname and lastname are correct", function () {
            expect(body.firstname).to.equal(test_data.firstname);
            expect(body.lastname).to.equal(test_data.lastname);
        });

        it("totalprice value is correct", function () {
            expect(body.totalprice).to.equal(test_data.totalprice);
        });

        it("depositpaid flag is correct", function () {
            expect(body.depositpaid).to.equal(test_data.depositpaid);
        });
});
