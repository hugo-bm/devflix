import server from '../index';
import request from 'supertest';


describe('Videos API request test',()=>{
    let res;
    it('Requesting videos of the "Rain" query', async ()=>{
       res = await request(server).get('/videos?q=rain');
       expect(res.status).toBe(200);
    });
    it('Requesting video by "id"', async ()=>{
        res = await request(server).get('/video?id=mPZkdNFkNps');
        expect(res.status).toBe(200);
     });    
    
});