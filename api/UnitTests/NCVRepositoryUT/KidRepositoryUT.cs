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
                ProgramHouse = "SDA",
                BirthPlace = "Cochabamba",
                Gender = "masculino"
            };
            int kidId = 1;

            repository.CreateKid(kidEntity);
            var result = await repository.SaveChangesAsync();

            // ACT 
            kidEntity = await repository.GetKidAsync(kidId);

            // ASSERT
            Assert.Equal(1, kidEntity.Id);
            Assert.Equal(kidId, kidEntity.Id);
        }
    }
}
