using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ModelsAndEntities
{
    public class ActivoFijoModel_EntityUT
    {
        [Fact]
        public void ModelFixedAsset_ReturnsFixedAssetModel()
        {
            //Arrange
            var fixedAssetmodel = new FixedAssetModel()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
            };           


            Assert.Equal(1, fixedAssetmodel.Id);
            Assert.Equal("TEC-489", fixedAssetmodel.Code);
            Assert.Equal("Computadora", fixedAssetmodel.Name);
            Assert.Equal(100.58m, fixedAssetmodel.Price);
        }

        [Fact]
        public void FixedAssetEntity_ReturnsFixedAssetEntity()
        {
            //Arrange
            var fixedAssetEntity = new FixedAssetEntity()
            {
                Id = 1,
                Code = "TEC-489",
                Name = "Computadora",
                Price = 100.58m,
            };


            Assert.Equal(1, fixedAssetEntity.Id);
            Assert.Equal("TEC-489", fixedAssetEntity.Code);
            Assert.Equal("Computadora", fixedAssetEntity.Name);
            Assert.Equal(100.58m, fixedAssetEntity.Price);
        }
    }
}
