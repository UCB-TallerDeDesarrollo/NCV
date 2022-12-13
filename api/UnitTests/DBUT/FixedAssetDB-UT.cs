using NinosConValorAPI.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.DBUT
{
    public class FixedAssetDB_UT:BaseTest
    {
        [Fact]
        public void CreateFixedAsset_AddFixedAssetToContext_ChangesDBState()
        {
            var fixedAsset = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
            };

            var fixedAssetAdded = ctx.Add(fixedAsset);
            var changesMade = ctx.SaveChanges();

            Assert.Equal(1, changesMade);
            Assert.Equal(1, fixedAssetAdded.Entity.Id);
        }
    }
}
