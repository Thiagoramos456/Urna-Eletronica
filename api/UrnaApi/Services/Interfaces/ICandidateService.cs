using UrnaBackend.Dtos;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services.Interfaces
{
    public interface ICandidateService
    {
        public Task<List<CandidateRegisterDto>> GetCandidates();
        public Task AddCandidate(CandidateRegisterDto candidate);
    }
}
