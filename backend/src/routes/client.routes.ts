import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { createClientController } from '@useCases/Client/CreateClient';
import { updateClientController } from '@useCases/Client/UpdateClient';
import { deleteClientController } from '@useCases/Client/DeleteClient';
import { listClientsController } from '@useCases/Client/ListClients';
import { listClientsPagController } from '@useCases/Client/ListClientsPaginated';
import { listClientsSearchController } from '@useCases/Client/ListClientsSearch';
import { showClientController } from '@useCases/Client/ShowClient';
import { suggestClientController } from '@useCases/Client/SuggestClient';

import Authenticated from '@middlewares/Authenticated';

const clientRouter = Router(); 

const upload = multer(uploadConfig);

clientRouter.use(Authenticated);

clientRouter.get('/', )
clientRouter.get('/', (request, response) =>  listClientsController.handle(request, response));
clientRouter.get('/search', (request, response) => listClientsSearchController.handle(request, response));
clientRouter.get('/suggest', (request, response) => suggestClientController.handle(request, response));
clientRouter.get('/paginated', (request, response) => listClientsPagController.handle(request, response));

clientRouter.get('/:id', (request, response) => showClientController.handle(request, response));

// Create Update Delete
clientRouter.post('/', upload.array('images'), (request, response) => createClientController.handle(request, response));
clientRouter.put('/:id', (request, response) => updateClientController.handle(request, response));
clientRouter.delete('/:id', (request, response) => deleteClientController.handle(request, response));

export { clientRouter };