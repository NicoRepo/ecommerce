import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { regions } from "./formData";

/**
 * Formulario de Contacto Completo
 * Valida todos los campos mediante RegExp
 */
export const ContactForm = ({
  errors,
  onSubmit,
  register,
  getValues,
  handleSubmit,
  onError,
  formEditable
}) => {
  const [comunas, setComunas] = useState(
    regions.find((r) => r.id === getValues("region"))?.comunas || []
  );

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset disabled={formEditable}>
        <Card.Body style={{height: "820px"}}>
          <Card.Title className="text-start">Contacto</Card.Title>
          <hr />
          <Row className="mb-2">
            <Form.Group
              as={Col}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mb-2"
              controlId="emailValidation"
            >
              <Form.Label>Correo de Contacto *</Form.Label>
              <Form.Control
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo es obligatorio",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9 _.-]+@[a-zA-Z0-9.-]+.[A-Za-z]{2,5}$/gm,
                    message: "El correo no es válido",
                  },
                })}
                placeholder="Correo"
                defaultValue=""
              />
              {errors.email && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mb-2"
              controlId="emailValidation2"
            >
              <Form.Label>Confirmar Correo *</Form.Label>
              <Form.Control
                {...register("emailConfirm", {
                  validate: (value) => {
                    const { email } = getValues();
                    return (
                      (email === value || !value) ||
                      "El correo no coindice."
                    );
                  },
                })}
                placeholder="Correo"
                defaultValue=""
              />
              {errors.emailConfirm && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.emailConfirm.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>
          <Card.Title className="text-start">Dirección de Envío</Card.Title>
          <hr />
          <Row className="mb-2">
            <Form.Group
              as={Col}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="mb-2"
              controlId="nameValidation"
            >
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "El nombre es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Za-z\u00C0-\u017F\s]{1,100}$/i,
                    message: "El nombre no es válido",
                  },
                })}
                placeholder="Nombre"
                defaultValue=""
              />
              {errors.firstName && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.firstName.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="mb-2"
              controlId="lastNameValidation"
            >
              <Form.Label>Apellido *</Form.Label>
              <Form.Control
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "El apellido es obligatorio",
                  },
                  pattern: {
                    value: /^[A-Za-z\u00C0-\u017F\s]{1,100}$/i,
                    message: "El apellido no es válido",
                  },
                })}
                placeholder="Apellido"
                defaultValue=""
              />
              {errors.lastName && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.lastName.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mb-2"
              controlId="RUTValidation"
            >
              <Form.Label>RUT *</Form.Label>
              <Form.Control
                {...register("RUT", {
                  required: {
                    value: true,
                    message: "El RUT es obligatorio",
                  },
                  pattern: {
                    value: /^[0-9]{6,8}-[0-9kK]$/i,
                    message: "El RUT no es válido",
                  },
                })}
                placeholder="RUT (12345678-9)"
                defaultValue=""
              />
              {errors.RUT && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.RUT.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mb-2"
              controlId="addressValidation"
            >
              <Form.Label>Dirección *</Form.Label>
              <Form.Control
                {...register("address", {
                  required: {
                    value: true,
                    message: "La dirección es obligatoria",
                  },
                  pattern: {
                    value: /^[A-Za-z,.-°\u00C0-\u017F\s]{5,100}$/i,
                    message: "La dirección no es válida",
                  },
                })}
                placeholder="Dirección"
                defaultValue=""
              />
              {errors.address && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.address.message}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group
              as={Col}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="mb-2"
              controlId="regionValidation"
            >
              <Form.Label>Región *</Form.Label>
              <Form.Select
                {...register("region", {
                  required: true,
                })}
                placeholder="Región"
                onChange={(e) => {
                  const { value } = e.target;
                  setComunas(
                    regions.find((r) => r.id === value)?.comunas || []
                  );
                }}
              >
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.region}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={6}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              className="mb-2"
              controlId="comunaValidation"
            >
              <Form.Label>Comuna *</Form.Label>
              <Form.Select
                {...register("comuna")}
                placeholder="Comuna"
                defaultValue=""
              >
                {comunas.map((c, index) => (
                  <option key={`comuna-${index}`} value={c}>
                    {c}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              className="mb-2"
              controlId="cellPhoneValidation"
            >
              <Form.Label>Teléfono *</Form.Label>
              <Form.Control
                {...register("cellPhone", {
                  required: {
                    value: true,
                    message: "El teléfono es obligatorio",
                  },
                  pattern: {
                    value: /^[0-9]{9,12}$/i,
                    message: "El teléfono no es válido",
                  },
                })}
                placeholder="Teléfono (912345678)"
                defaultValue=""
              />
              {errors.cellPhone && (
                <Form.Text className="text-danger" type="invalid">
                  {errors.cellPhone.message}
                </Form.Text>
              )}
            </Form.Group>
          </Row>
        </Card.Body>
      </fieldset>

      <Card.Footer>
        <div className="d-flex justify-content-end">
          <Button variant="outline-dark" type="submit" disabled={formEditable}>
            Confirmar
          </Button>
        </div>
      </Card.Footer>
    </Form>
  );
};
