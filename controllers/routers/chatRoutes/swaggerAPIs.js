/* eslint-disable max-len */
/**
* @swagger
* paths:
*  /api/user/chat/send-message:
*    post:
*      tags: [Chat]
*      summary: sendMessage
*      requestBody:
*        content:
*          application/json:
*            schema:
*              type: object
*              example:
*                textMessage: hello bishoy iam george
*                user2Id: 61cb13e83ca6848543427422
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: number
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM1MDkxZTY5YjAwMGNmMmQ1YzI1YjgiLCJwcmltYXJ5QmxvZyI6IjYxYzUwOTFlNjliMDAwY2YyZDVjMjViYiIsImlhdCI6MTY0MDY5ODc5Mn0.2wjo_aNGnVSpkCgXel7cExCE_vj9Ga-YUWPNt4B5uVk
*      responses:
*        200:
*         description: The request has succeeded
*         content:
*           application/json:
*             schema:
*              example:
*                message: massege has been sent to user
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*  /api/user/chat/reterive-chat/{id}:
*    get:
*      tags: [Chat]
*      summary: reteriveChat
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: number
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM1MDkxZTY5YjAwMGNmMmQ1YzI1YjgiLCJwcmltYXJ5QmxvZyI6IjYxYzUwOTFlNjliMDAwY2YyZDVjMjViYiIsImlhdCI6MTY0MDY5ODc5Mn0.2wjo_aNGnVSpkCgXel7cExCE_vj9Ga-YUWPNt4B5uVk
*        - name: id
*          in: path
*          schema:
*            type: string
*          required: true
*          example: 61c6ff4e3034e6b1fd37d40e
*      responses:
*        200:
*         description: The request has succeeded
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 messages:
*                   type: object
*                   description: array of messages information
*                   items:
*                     type: object
*                     properties:
*                       timeStamp:
*                         type: timestamp
*                         description: When that event occure
*                       text:
*                         type: string
*                         description: the text you send
*                       image:
*                         type: string
*                         description: the image you send
*                 index:
*                   type: string
*                   description: string representing from and to blog handels
*               example:
*                 {
*                   "index": "yousef + peter",
*                   "messages": [
*                              {
*                                "timeStamp": "",
*                                "text": "hello",
*                              }
*                            ]
*                 }
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*  /api/user/chat/reterive-conversations:
*    get:
*      tags: [Chat]
*      summary: reteriveConverstions
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: number
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM1MDkxZTY5YjAwMGNmMmQ1YzI1YjgiLCJwcmltYXJ5QmxvZyI6IjYxYzUwOTFlNjliMDAwY2YyZDVjMjViYiIsImlhdCI6MTY0MDY5ODc5Mn0.2wjo_aNGnVSpkCgXel7cExCE_vj9Ga-YUWPNt4B5uVk
*        - name: id
*          in: path
*          schema:
*            type: string
*          required: true
*          example: 61c6ff4e3034e6b1fd37d40e
*      responses:
*        200:
*         description: The request has succeeded
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 messages:
*                   type: object
*                   description: array of messages information
*                   items:
*                     type: object
*                     properties:
*                       timeStamp:
*                         type: timestamp
*                         description: When that event occure
*                       text:
*                         type: string
*                         description: the text you send
*                       image:
*                         type: string
*                         description: the image you send
*                 index:
*                   type: string
*                   description: string representing from and to blog handels
*               example:
*                 {
*                   "index": "yousef + peter",
*                   "messages": [
*                              {
*                                "timeStamp": "",
*                                "text": "hello",
*                              }
*                            ]
*                 }
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*  /api/user/chat/delete-chat/{id}:
*    delete:
*      tags: [Chat]
*      summary: deleteChat
*      parameters:
*        - name: Authorization
*          in: header
*          schema:
*            type: string
*          example: >-
*            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWM1MDkxZTY5YjAwMGNmMmQ1YzI1YjgiLCJwcmltYXJ5QmxvZyI6IjYxYzUwOTFlNjliMDAwY2YyZDVjMjViYiIsImlhdCI6MTY0MDU1MTYyMH0.byshD6nYEhcUfQIbKPHLrF30FsShziS0wBYpRGdMn6k
*      responses:
*        200:
*         description: The request has succeeded
*         content:
*           application/json:
*             schema:
*               example:
*                 message: chat has been deleted deleted
*        400:
*          $ref: '#/components/responses/400BadRequest'
*        401:
*          $ref: '#/components/responses/401Unauthorized'
*        500:
*          $ref: '#/components/responses/500ServerError'
*/
