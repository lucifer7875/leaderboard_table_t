import { Router } from 'express';
import { IsTokenValid } from '../../middleware/isTokenValidMiddleware';
import LeadBoardController from './leadBordController';
import { Validator } from '../../validate';
import { CreateLeadBoardValidator, UpdateLeadBoardValidator } from './leadBordValidator';

const router: Router = Router();
const leadBoardController = new LeadBoardController();
const v: Validator = new Validator();

router.get('/', IsTokenValid, leadBoardController.getLeadBoardData);
router.post('/', IsTokenValid, leadBoardController.addLeadBoardData);
router.post('/add-activity', IsTokenValid, leadBoardController.addLeadBoardActivity);

const leadBoardRoute: Router = router;

export default leadBoardRoute;
