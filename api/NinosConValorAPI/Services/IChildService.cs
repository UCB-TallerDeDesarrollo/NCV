using NinosConValorAPI.Models;

namespace NinosConValorAPI.Services
{
    public interface IChildService
    {
        ChildModel GetChild(int childId);
        ChildModel CreateChild(ChildModel child);
    }
}
