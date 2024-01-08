using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        //**Use case: Return a specific activies by ID **
        //query handler mediator take activity ID 
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _dbContext;

            public Handler(DataContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _dbContext.Activities.FindAsync(request.Id);
            }
        }


    }
}
