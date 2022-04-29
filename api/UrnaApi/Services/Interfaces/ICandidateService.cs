using UrnaBackend.Models;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services.Interfaces
{
    public interface ICandidateService
    {
        public Task<List<CandidateModel>> GetCandidates();
    }
}
