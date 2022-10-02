using AutoMapper;
using Moq;
using NinosConValorAPI;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models;
using NinosConValorAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTests.NCVRepositoryUT;

namespace UnitTests.ServiceUT
{
    public class KidServiceUT
    {
        [Fact]
        public async Task GetKidAsync_GetAnExistingKidReport_ReturnsKidModel()
        {
            // ARRANGE
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var kidEntity = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };

            int kidId = 1;

            var ncvRepositoryMock = new Mock<INCVRepository>();
            ncvRepositoryMock.Setup(r => r.GetKidAsync(kidId)).ReturnsAsync(kidEntity);

            var kidService = new KidService(ncvRepositoryMock.Object, mapper);

            // ACT
            var returnedKid = await kidService.GetKidAsync(kidId);

            // ASSERT
            Assert.Equal(1, returnedKid.Id);
            Assert.Equal("Manuel", returnedKid.FirstName);
            Assert.Equal("1234567", returnedKid.CI);
        }
        [Fact]
        public async Task CreateKid_AddKid_ReturnsAddedKid()
        {
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var kidModel = new KidModel()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };
            var kidEntity = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };

            var kidRepositoryMock = new Mock<INCVRepository>();
            kidRepositoryMock.Setup(r => r.CreateKid(kidEntity));
            kidRepositoryMock.Setup(r => r.SaveChangesAsync()).ReturnsAsync(true);

            var kidService = new KidService(kidRepositoryMock.Object, mapper);
            var kidAdded = await kidService.CreateKidAsync(kidModel);
            Assert.Equal("Manuel", kidAdded.FirstName);
        }
        [Fact]
        public async Task GetKids_AddKids_ReturnAssert()
        {
            var kid1 = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };

            var kid2 = new KidEntity()
            {
                Id = 2,
                FirstName = "Pedro",
                LastName = "Tintos",
                CI = "1234563",
                BirthDate = new DateTime(2010, 9, 15),
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };
            var config = new MapperConfiguration(cfg => cfg.AddProfile<AutomapperProfile>());
            var mapper = config.CreateMapper();
            var enumerable = new List<KidEntity>() { kid1, kid2 } as IEnumerable<KidEntity>;
            var kidRepositoryMock = new Mock<INCVRepository>();
            kidRepositoryMock.Setup(r => r.GetKidsAsync()).ReturnsAsync(enumerable);

            var kidService = new KidService(kidRepositoryMock.Object, mapper);
            var listKids = await kidService.GetKidsAsync();
            Assert.Equal(2, listKids.Count());
        }
    }
}
