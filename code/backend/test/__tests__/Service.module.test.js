const PersistentManager = require("../../dao/PersistentManager");
const ServiceManager = require("../../controllers/ServiceManager");

describe("Add Service", () => {
  let lastId = 0;
  test("defineService", async () => {
    lastId = await ServiceManager.defineService("newService", 30);
    const newSer = await PersistentManager.loadOneByAttribute(
      "Service",
      "ServiceName",
      "newService"
    );

    const expected = {
      ServiceId: lastId,
      ServiceName: "newService",
      ServiceTime: 30,
    };
    expect(newSer).toEqual(expected);
  });

  test("updateService", async () => {
    const updateServiceTime = 33;
    const updateSerName = "updateService";
    await ServiceManager.updateService(
      lastId,
      updateSerName,
      updateServiceTime
    );
    const updateSer = await PersistentManager.loadOneByAttribute(
      "Service",
      "ServiceId",
      lastId
    );
    const expected = {
      ServiceId: lastId,
      ServiceName: "updateService",
      ServiceTime: updateServiceTime,
    };
    expect(updateSer).toEqual(expected);
  });

  test("delete Service", async () => {
    await ServiceManager.deleteService(lastId);
    expect(ServiceManager.deleteService(lastId)).rejects.toEqual(
      "422 No available Service found "
    );
  });
});
