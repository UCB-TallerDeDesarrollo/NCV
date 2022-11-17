using NinosConValorAPI.Data.Entity;
using NinosConValorAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.ModelsAndEntities
{
    public class AssetStateModel_EntityUT
    {
        [Fact]
        public void ModelAssetState_ReturnsAssetStateModel()
        {
            //Arrange
            var assetStatemodel = new AssetStateModel()
            {
                Id = 1,               
                State = "Obsoleto"
            };


            Assert.Equal(1, assetStatemodel.Id);           
            Assert.Equal("Obsoleto", assetStatemodel.State);

        }

        [Fact]
        public void AssetStateEntity_ReturnsAssetStateEntity()
        {
            //Arrange
            var assetStateEntity = new AssetStateEntity()
            {
                Id = 1,                
                State = "Obsoleto"
            };


            Assert.Equal(1, assetStateEntity.Id);           
            Assert.Equal("Obsoleto", assetStateEntity.State);

        }
    }
}

