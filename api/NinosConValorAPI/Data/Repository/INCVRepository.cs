using NinosConValorAPI.Data.Entity;
using System.Collections.Generic;

namespace NinosConValorAPI.Data.Repository
{
    public interface INCVRepository
    {
        //Task<bool> SaveChangesAsync();
        ChildEntity GetChild(int childId);
        ChildEntity CreateChild(ChildEntity child);
    }
}
