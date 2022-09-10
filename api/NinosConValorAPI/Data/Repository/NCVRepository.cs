using NinosConValorAPI.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace NinosConValorAPI.Data.Repository
{
    public class NCVRepository:INCVRepository
    {
        private IList<ChildEntity> _children;
         public NCVRepository()
        {
            _children = new List<ChildEntity>();
            _children.Add(new ChildEntity()
            {
                Id = 1,
                FirstName = "Manuel",
                LastName = "Flores",
                CI = "1234567",
                Birthdate = new DateTime(2010, 8, 12),
                programHouseId = 1,
                BirthPlace = new DateTime(2020, 8, 12),
                Gender = "Masculino"
            });
           
        }

          public ChildEntity CreateChild(ChildEntity child)
        {
            var lastChild = _children.OrderByDescending(r => r.Id).FirstOrDefault();
            int nextId = lastChild != null ? lastChild.Id + 1 : 1;
            child.Id = nextId;
            _children.Add(child);
            return child;
        }
         public ChildEntity GetChild(int childId)
        {
            var child = _children.FirstOrDefault(r => r.Id == childId);
            return child;
        }
        /*
        public async Task<bool> SaveChangesAsync()
        {
            try
            {
                var result = await _dbContext.SaveChangesAsync();
                return result > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }*/
    }
}
