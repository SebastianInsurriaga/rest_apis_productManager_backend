import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *      schemas: 
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1  
 *                  name: 
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo 24 pulgadas 
 *                  price: 
 *                      type: number
 *                      description: The product price
 *                      example: 300 
 *                  availability: 
 *                      type: boolean
 *                      description: The product availability
 *                      example: true
 * 
 */

/**
 * @swagger
 * /api/products:
 *      get: 
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of prodcuts
 *          responses: 
 *              200:
 *                  description: Successfull response
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: array
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the producto to retrieve
 *          requier: true
 *          squema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad request - Invalid ID
 */            

router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,    
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags: 
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor curvo 24 pulgadas
 *                          price:
 *                              type: number
 *                              example: 299
 *      responses:
 *          201:
 *              description: Product created successfully
 *          400:
 *              description: Bad Request - Invalid Input
 */

router.post('/', 
    // Validación
    body('name')
        .notEmpty().withMessage('El campo nombre no puede estar vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El campo precio no puede estar vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the producto to retrieve
 *          requier: true
 *          squema: 
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Monitor curvo 24 pulgadas
 *                          price:
 *                              type: number
 *                              example: 299 
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad request - Invalid ID or Invalid Input Data
 */

router.put('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El campo nombre no puede estar vacio'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El campo precio no puede estar vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability').isBoolean().withMessage('Valor de disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update product availability
 *      tags:
 *          - Products
 *      description: Returns the updated availability
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the producto to retrieve
 *          requier: true
 *          squema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad request - Invalid ID or Invalid Input Data
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the producto to delete
 *          requier: true
 *          squema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto eliminado correctamente'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad request - Invalid ID or Invalid Input Data
 */


router.delete('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router