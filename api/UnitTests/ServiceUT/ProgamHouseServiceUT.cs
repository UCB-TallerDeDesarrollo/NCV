using AutoMapper;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Exceptions;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ServiceUT
{
    public class ProgamHouseServiceUT
    {
        [Fact]
        public async Task GetProgramHouses_ReturnsAllProgramHouses()
        {
            var programHouse1 = new ProgramHouseEntity()
            {
                Id = 1,
                Name = "Casa de Esperanza",
                PhoneNumber = "4028798",
                Acronym = "CDE",
                Location = "Av 6 de agosto",                
                FixedAssets = new List<FixedAssetEntity>()
            };

            var programHouse2 = new ProgramHouseEntity()
            {
                Id = 1,
                Name = "Casa de Esperanza 2",
                PhoneNumber = "4028798",
                Acronym = "CDE2",
                Location = "Av 6 de septiembre",
                FixedAssets = new List<FixedAssetEntity>()
            };
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<ProgramHouseEntity>() { programHouse1, programHouse2 } as IEnumerable<ProgramHouseEntity>;
            var programHouseRepositoryMock = new Mock<INCVRepository>();
            programHouseRepositoryMock.Setup(r => r.GetProgramHousesAsync()).ReturnsAsync(enumerable);

            var programHouseService = new ProgramHouseService(programHouseRepositoryMock.Object, mapper);
            var listProgramHouses = await programHouseService.GetProgramHousesAsync();
            Assert.Equal(2, listProgramHouses.Count());
        }

        [Fact]
        public async Task GetProgramHouses_ResultFalse_ThrowsException()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();           
            var programHouseRepositoryMock = new Mock<INCVRepository>();
            programHouseRepositoryMock.Setup(r => r.GetProgramHousesAsync()).ReturnsAsync((List<ProgramHouseEntity>)null);

            var programHouseService = new ProgramHouseService(programHouseRepositoryMock.Object, mapper);           
            var exception = Assert.ThrowsAsync<NotFoundElementException>(async () => await programHouseService.GetProgramHousesAsync());
            Assert.Equal("La lista de programas no existe o está vacía.", exception.Result.Message);
        }
    }
}
