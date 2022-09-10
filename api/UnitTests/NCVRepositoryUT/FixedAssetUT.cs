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
    
    public class FixedAssetUT:BaseTest
    {
        [Fact]
        public async Task CreateFixedAsset_AddFixedAssetToEmptyDB_ReturnsTrueSavedCorrectly()
        {
            // ARRANGE
            var repository = new NCVRepository(ctx);
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Name = "Computadora",
                Description = "Computadora de escritorio",
                EntryDate = new DateTime(2001, 3, 2),
                Price = 100.58m,
                Features = "8Gb de RAM",
                Quantity = 5
            };

            // ACT 
            repository.CreateFixedAsset(fixedAsset);
            var result = await repository.SaveChangesAsync();

            // ASSERT
            Assert.True(result);
        }

    }
}
