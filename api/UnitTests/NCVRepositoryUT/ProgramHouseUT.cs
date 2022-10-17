using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Data.Repository;
using NinosConValorAPI.Models.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTests.DBUT;

namespace UnitTests.NCVRepositoryUT
{
    public class ProgramHouseUT:BaseTest
    {
        [Fact]
        public async Task GetFixedAssets_ReturnListOfFixedAssets()
        {
            var repository = new NCVRepository(ctx);
            var programHouse = new ProgramHouseEntity()
            {
                Id = 2,
                Name = "casa 1",
                ResponsibleUser = new IdentityAppUser()
                {
                    Id = "aaefawef",
                    FirstName = "juna",
                    LastName = "perez",
                    State = 1
                }

            };            
            ctx.Add(programHouse);
            ctx.SaveChanges();
            var listProgramHouses = await repository.GetProgramHousesAsync();          
            Assert.Single(listProgramHouses);
            Assert.Equal("casa 1", listProgramHouses.First().Name);
        }
    }
}
