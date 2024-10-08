const request = require('supertest');
const app = require('./../index');
const mongoose = require('mongoose');
const Product = require('./../models/Product');

describe('Product Controllers Testing', () => {
  const testName = "producto prueba";
  const testUrl = "www.image.com/image";
  const testType = "tipo";
  const testDescription = "Descripción del producto de prueba.";
  const testConservation = "Conservar en un lugar fresco y seco.";
  const testVegetarian = true;
  const testPerishable = false;

  beforeEach(async () => {
    await Product.deleteMany({});
  }, 10000);

  afterAll(async () => {
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  it('Debería agregar un nuevo producto a la base de datos', async () => {
    const response = await request(app)
      .post('/api/create-product')
      .send({
        name: testName,
        imageurl: testUrl,
        type: testType,
        description: testDescription,
        conservation: testConservation,
        vegetarian: testVegetarian,
        perishable: testPerishable
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('ok', true);
    expect(response.body).toHaveProperty('msg', `El producto ${testName} ha sido creado en base de datos!`);
  });

  it('No debería registrar un producto si ya existe en la base de datos', async () => {
    await new Product({
      name: testName,
      imageurl: testUrl,
      type: testType,
      description: testDescription,
      conservation: testConservation,
      vegetarian: testVegetarian,
      perishable: testPerishable
    }).save();

    const response = await request(app)
      .post('/api/create-product')
      .send({
        name: testName,
        imageurl: testUrl,
        type: testType,
        description: testDescription,
        conservation: testConservation,
        vegetarian: testVegetarian,
        perishable: testPerishable
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('ok', false);
    expect(response.body).toHaveProperty('msg', `${testName} ya existe en la base de datos!`);
  });

  it('No debería registrar un producto si falta el campo de nombre', async () => {
    const response = await request(app)
      .post('/api/create-product')
      .send({
        name: "",
        imageurl: testUrl,
        type: testType,
        description: testDescription,
        conservation: testConservation,
        vegetarian: testVegetarian,
        perishable: testPerishable
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('ok', false);
    expect(response.body.msg.name).toHaveProperty('msg', 'El nombre del producto es requerido!');
  });
});
