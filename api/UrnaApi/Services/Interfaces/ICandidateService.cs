using UrnaBackend.Dtos;
using UrnaEFCore.Entities;

namespace UrnaBackend.Services.Interfaces
{
    public interface ICandidateService
    {
        public Task<bool> DeleteCandidate(int candidateId);
        public Task<bool> AddCandidate(CandidateRegisterDto candidate);
        public CandidateUrnDto GetCandidateByElectoralNumber(int electoralNumber);
    }
}
