# GODAPP

un projet qui permet de créer des nfts pour le moment sur test Ropsten


must add

import React, {useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Imgix from 'react-imgix';
function MarketPlace() {
    const [isLoading, setIsLoading] = useState(true);
    const [NFTs, setNFTs] = useState([]);
useEffect(() => {
        setIsLoading(true);
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://testnets-api.opensea.io/api/v1/assets?owner=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&offset=0&limit=50", requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log('Success:', result);
                setIsLoading(false);
                const result1 = result.assets.filter(d => d.image_thumbnail_url !== null)
                setNFTs(result1);
            })
            .catch(error => console.log('error', error));
    }, []);
if (isLoading) {
        return (
            <section>
                Loading....
            </section>
        )
    }
return (
        <div style={{ backgroundColor: '#111'}}>
        <Container className='mt-4'>
        <Row>
          {NFTs.map(plan => (
                <Col md={3}>
                  <Card bg="dark" text="white">
                      <div style={{ textAlign: 'center'}}>
                      {/* <Card.Img variant="top" src={plan.image_thumbnail_url} style={{ width: "18rem", height: "20rem" }} /> */}
                      <Imgix src={plan.image_thumbnail_url} sizes="800vw" />;
                      </div>
                      <Card.Body>
                          <Card.Title>{plan.name}</Card.Title>
                          <Card.Text>{plan.description.replace(/^(.{20}[^\s]*).*/, "$1")}</Card.Text>
                          <Button variant="primary" onClick={() => window.open(plan.permalink, "_blank")}>Buy This NFT</Button>
                      </Card.Body>
                  </Card>
                  <Card style={{ backgroundColor: '#111' }}><br></br></Card>
               </Col>   
          ))}
        </Row>
        </Container>
        </div>
      );
}
export default MarketPlace
