import { Card, Badge } from "react-bootstrap";
import TextOverflow from "react-text-overflow";
import { formatPrice } from "../../helpers";

export const ProductCard = ({ id, img, name, price, artist }) => {
  return (
    <Card
      key={id}
      className="my-1 d-flex flex-row align-items-center"
      bg="light"
      border="secondary"
    >
      <Card.Img
        className="border rounded"
        variant="left"
        src={img}
        alt={name}
        style={{ width: "80px" }}
      />
      <Card.Body>
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-column">
            <Card.Title className="mb-1">
              <TextOverflow text={name} />
            </Card.Title>
            <Card.Subtitle className="mb-1 text-secondary">
              {artist}
            </Card.Subtitle>
          </div>
          <div className="ms-auto">
            <Badge className="text-dark p-2 border border-success" bg="light">
              $ {formatPrice(price)}
            </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};