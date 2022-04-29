using UrnaBackend.Models;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services.Interfaces
{
    public interface ICandidateService
    {
        public Task<List<CandidateDto>> GetCandidates();
        public Task AddCandidate(CandidateDto candidate);
    }
}
