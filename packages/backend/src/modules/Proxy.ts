import {Module}              from '@nestjs/common';
import {ProxyService} from "../services/Proxy.js";
import {ProxyController} from "../controllers/Proxy.js";

@Module({
  imports:[],
  providers:[ProxyService],
  exports:[ProxyService],
  controllers:[ProxyController]
})
export class ProxyModule{
}
