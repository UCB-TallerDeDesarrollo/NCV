using Microsoft.Extensions.Diagnostics.HealthChecks;
using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTests.DBUT;

namespace UnitTests.NCVRepositoryUT
{
    public class KidRepositoryUT : BaseTest
    {
        [Fact]
        public async Task GetKidAsync_GetAnExistingKid_ReturnsKidEntity()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var kidEntity = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = new ProgramHouseEntity() { Id = 2, Name = "Sendero de Esperanza" },
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };
            int kidId = 1;

            repository.CreateKidAsync(kidEntity);
            var result = await repository.SaveChangesAsync();

            // ACT 
            kidEntity = await repository.GetKidAsync(kidId);

            // ASSERT
            Assert.Equal(1, kidEntity.Id);
            Assert.Equal(kidId, kidEntity.Id);
        }
        [Fact]
        public async Task CreateKid_AddKidToEmptyDB_ReturnsTrueSavedCorrectly()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var kid = new KidEntity()
            {
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = new ProgramHouseEntity() { Id = 2, Name = "Sendero de Esperanza" },
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };

            // ACT 
            repository.CreateKidAsync(kid);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
        }
        [Fact]
        public async Task GetKids_AddKidToEmptyDB_ReturnListOfKids()
        {
            // CREATE 1 KID
            var repository = new NCVRepository(ctx);
            var kid = new KidEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                BirthDate = new DateTime(2010, 9, 12),
                ProgramHouse = new ProgramHouseEntity() { Id = 2, Name = "Sendero de Esperanza" },
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };
            repository.CreateKidAsync(kid);
            var result = await repository.SaveChangesAsync();

            // NUMBER OF FIXED ASSETS
            var listKids = await repository.GetKidsAsync();
            var numberOfKids = listKids.Count();
            Assert.Equal(1, numberOfKids);
        }

    }
}
