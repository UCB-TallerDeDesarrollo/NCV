using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Controllers;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ControllersUT
{
    public class ProgramHouseControllerUT
    {
        [Fact]
        public async Task GetProgramHouses_ReturnsProgramHousesListCorrectly()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var programHouseModel = new ProgramHouseModel()
            {
                Id = 1,
                Name = "Casa de Esperanza",
                PhoneNumber = "4028798",
                Acronym = "CDE",
                Location = "Av 6 de agosto",
                ResponsibleId = "c1a4cdab-d902-4097-92b6-90db3c826776",
                FixedAssets =new List<FixedAssetModel>()
            };     
            var programHouseServiceMock = new Mock<IProgramHouseService>();           
            var enumerable = new List<ProgramHouseModel>() { programHouseModel } as IEnumerable<ProgramHouseModel>;
            programHouseServiceMock.Setup(r => r.GetProgramHousesAsync()).ReturnsAsync(enumerable);

            var programHouseController = new ProgramHousesController(programHouseServiceMock.Object);
            var response = await programHouseController.GetProgramHousesAsync();
            var status = (OkObjectResult)response.Result;
            var programHousesList = status.Value as List<ProgramHouseModel>;
            Assert.Single(programHousesList);
            Assert.Equal(200, status.StatusCode);
        }

        [Fact]
        public async Task GetProgramHouses_ServiceReturnsNotFoundException_ReturnsNotFound()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();        
            var programHouseServiceMock = new Mock<IProgramHouseService>();
            programHouseServiceMock.Setup(r => r.GetProgramHousesAsync()).Throws(new NotFoundElementException("La lista de programas no existe o está vacía."));

            var programHouseController = new ProgramHousesController(programHouseServiceMock.Object);
            var response = await programHouseController.GetProgramHousesAsync();
            var status = (ObjectResult)response.Result;
            var message = ((ObjectResult)response.Result).Value;

            Assert.Equal("La lista de programas no existe o está vacía.", message);
            Assert.Equal(404, status.StatusCode);
        }

    }
}
