
import { INestApplication, Logger } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";


export let app:INestApplication;

global.beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .setLogger(new Logger())
        .compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
})

global.afterAll(async () => {
    if(app) await app.close();
})



